# lucky Mtshali
from django import views
from django.contrib.auth.models import User
from rest_framework import serializers
from . import models

# Role permissions serializers


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Profile
        fields = ['avatar', 'bgcolor']

# user Serialize


class UserSerializer(serializers.ModelSerializer):
    user_profile = ProfileSerializer(many=False, required=False)

    class Meta:
        password = serializers.CharField(
            max_length=128, min_length=6)
        model = User
        fields = ['id', 'username', 'first_name',
                  'last_name', 'email', 'user_profile', 'is_active', 'password']
        extra_kwargs = {'password': {'write_only': True},
                        'url': {'view_name': 'user-detail'}, }
        search_fields = ['username','first_name','last_name']

    def create(self, validated_data):
        user_profile_data = validated_data.pop('user_profile')
        user = User.objects.create(**validated_data)
        models.Profile.objects.create(user=user, **user_profile_data)
        return user

    def update(self, instance, validated_data):
        try:
            nested_serializer = self.fields['user_profile']
            nested_instance = instance.user_profile
            nested_data = validated_data.pop("user_profile")
            nested_serializer.update(nested_instance, nested_data)
        except:
            print()
        return super().update(instance, validated_data)


# Role permissions serializers
class RolePermissionSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.RolePermission
        fields = ['id', 'project', 'backlog', 'task', 'bug',
                  'release', 'team', 'group_members', 'assign']
        
    
# member serializer
class MemberSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)
    member_permission = RolePermissionSerializer(many=False ,required=True) 

    def create(self, validated_data):
        permissions_data = validated_data.pop('member_permission')
        member = models.Member.objects.create(**validated_data)
        models.RolePermission.objects.create(member=member,**permissions_data)

        return member
    
    class Meta:
        model = models.Member
        fields = ['id', 'user', 'member_permission']

class TaskCommentSerializer(serializers.HyperlinkedModelSerializer):
    commentor = MemberSerializer()

    class Meta:
        model = models.TaskComment
        fields = ['id', 'date_created', 'description', 'commentor']


class TaskSerializer(serializers.ModelSerializer):
    assigned_details = MemberSerializer(
        source='assigned', many=False, read_only=True)
    taskComments = TaskCommentSerializer(many=True, required=False)
    estimations = serializers.DurationField()

    class Meta:
        model = models.Task
        fields = ['id', 'tittle', 'description', 'estimations', 'date_created', 'estimations',
                  'time_worked','time_start','time_completed','time_assigned','progress', 'status','task_play', 'taskComments', 'assigned', 'assigned_details']


class BacklogSerializer(serializers.ModelSerializer):
    backlog_tasks = TaskSerializer(many=True, required=False)

    class Meta:
        model = models.Backlog
        fields = ['id', 'date_created', 'tittle', 'description', 'acceptence_criteria',
                  'story_points', 'color', 'priority', 'progress', 'status', 'backlog_tasks', 'release']
        extra_kwargs = {'release': {"required": False, "allow_null": True}}

    def create(self, validated_data):
        backlog_task = validated_data.pop('backlog_tasks')
        backlog = models.Backlog.objects.create(**validated_data)

        for task in backlog_task:
            models.Task.objects.create(backlog=backlog, **task)

        return backlog


class BugCommentSerializer(serializers.HyperlinkedModelSerializer):
    # commentor field represents the relationship between Task comments and the member who created the task comment
    commentor = MemberSerializer()

    class Meta:
        model = models.BugComment
        fields = ['date_created', 'description', 'commentor']

# Bug serializer


class BugSerializer(serializers.HyperlinkedModelSerializer):
    assigned = MemberSerializer(read_only=True)
    reporter = MemberSerializer(read_only=True)
    bugComments = BugCommentSerializer(many=True, required=False)

    class Meta:
        model = models.Bug
        fields = ['id', 'date_created', 'tittle', 'description', 'reproduce', 'severity',
                  'status', 'time_worked', 'time_status', 'assigned', 'reporter', 'bugComments']


class TeamSerializer(serializers.ModelSerializer):
    members_team = MemberSerializer(required=False, many=True)

    class Meta:
        model = models.Team
        fields = ['id', 'name', 'description', 'members_team']


class ReleaseSerializer(serializers.ModelSerializer):
    release_backlogs = BacklogSerializer(many=True, required=False)
    release_bugs = BugSerializer(many=True, required=False, read_only=True)
    teams_working_on = TeamSerializer(
        many=True, required=False, read_only=True)

    class Meta:
        model = models.Release
        fields = ['id', 'date_created', 'tittle', 'purpose',
                  'teams_working_on', 'release_backlogs', 'release_bugs']
        
class RequirementsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Requirement
        fields = ['id','requirement','isComplete']

    


class ProjectSerializer(serializers.HyperlinkedModelSerializer):
    project_owner = UserSerializer(required=False)
    project_releases = ReleaseSerializer(many=True, required=False)
    project_requirements = RequirementsSerializer(many=True,required=False)

    class Meta:
        model = models.Project
        fields = ['id', 'date_created', 'due_date', 'tittle',
                  'description', 'progress', 'project_owner', 'project_releases','project_requirements']

    def create(self, validated_data):
        project_releases_data = validated_data.pop('project_releases')
        requirements_data = validated_data.pop('project_requirements')

        project = models.Project.objects.create(**validated_data)

        for requirement in requirements_data:
            models.Requirement.objects.create(**requirement,project = project)

        for release in project_releases_data:
            release_backlog_data = release.pop('release_backlogs')
            created_release = models.Release.objects.create(
                project=project, **release)

            for backlog in release_backlog_data:
                backlog.pop('backlog_tasks')
                models.Backlog.objects.create(
                    release=created_release, **backlog)

        return project
    
# Task serializer


# Messages serializers
class MessageSerializer(serializers.HyperlinkedModelSerializer):
    sender = UserSerializer(read_only=True)

    class Meta:
        model = models.Message
        fields = ['id', 'note', 'date_created', 'isRead', 'sender']


# Conversation serializers
class ConversationsSerializer(serializers.ModelSerializer):
    conversations = MessageSerializer(required=False, many=True)
    participant_one = UserSerializer(
        required=False, many=False, read_only=True)
    participant_two = UserSerializer(
        required=False, many=False, read_only=True)
    
    def update(self, instance, validated_data):
        messages_serializer = models.Message.objects.filter(conversation = instance.id)

        request  = self.context.get('request')
        user = None
        if request and hasattr(request,"user"): 
            for message in messages_serializer:
                if(message.sender != request.user.id and message.isRead == False):
                   message.isRead = True 
                   message.save()
                    
        return super().update(instance, validated_data)
    
    class Meta:
        model = models.Conversation
        fields = ['id', 'date_created', 'participant_one',
                  'participant_two', 'conversations']

# Notification serializer


class NotificationSerializer(serializers.HyperlinkedModelSerializer):
    receiver = UserSerializer(many=False, read_only=True)

    class Meta:
        model = models.Notification
        fields = ['id', 'date_created', 'description', 'isRead', 'receiver']

# Task comment Serilizers
