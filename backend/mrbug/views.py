from django.shortcuts import get_object_or_404, render
from .serializers import *
from .models import * 
from rest_framework import generics, permissions
from knox.auth import TokenAuthentication
from knox.views import LoginView as KnoxLoginView
from rest_framework.authentication import BasicAuthentication
from rest_framework import filters
from django.db.models import Q
import django_filters as django_filters
from django.contrib.auth.hashers import make_password

# USER END POINT
# Login view to obtain tokens
class LoginView(KnoxLoginView):
    authentication_classes = [BasicAuthentication]

# UserList view is used to retrieve all users in the database as well as creating a new user
class UserCreate(generics.CreateAPIView):
    Authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.AllowAny]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        password = make_password(self.request.data['password'])
        return serializer.save(password=password)

class UserList(generics.ListAPIView):
    Authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.prefetch_related('user_profile')
    serializer_class = UserSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['username','first_name','last_name']


class UserDetails(generics.RetrieveUpdateDestroyAPIView):
    Authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.prefetch_related('user_profile')
    serializer_class = UserSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]

#return only user object associated with the logged in user
    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        user = queryset.get(pk=self.request.user.id)
        return user

####################################################################################
# Projects END POINT
####################################################################################

class ProjectList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Project.objects.prefetch_related('project_owner','project_releases')
    serializer_class = ProjectSerializer

    def get_queryset(self):
        # filtering view results to only show projects associatied to a specific user.
        user = self.request.user
        return Project.objects.filter(Q(project_owner = user.id)|Q(project_releases__teams_working_on__members_team__user=user.pk)).distinct()

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(project_owner=user)

class ProjectDetails(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Project.objects.prefetch_related('project_owner','project_releases','project_requirements')
    serializer_class = ProjectSerializer

    # filtering queryset to return anly projects associated to the user.
    def get_queryset(self):
        user = self.request.user
        return Project.objects.filter(project_owner=user)

####################################################################################
# RELEASE END POINT
####################################################################################


class ReleaseList(generics.ListCreateAPIView):
    permission_class = [permissions.IsAuthenticated]
    queryset = Release.objects.prefetch_related('release_backlogs','release_bugs','teams_working_on')
    serializer_class = ReleaseSerializer

    def perform_create(self, serializer):
        project = Project.objects.get(id=self.request.data["project"])
        return serializer.save(project=project)

class ReleaseDetails(generics.RetrieveUpdateDestroyAPIView):
    permission_class = [permissions.IsAuthenticated]
    queryset = Release.objects.prefetch_related('release_backlogs','release_bugs','teams_working_on')
    serializer_class = ReleaseSerializer

####################################################################################
# BACKLOG END POINT
####################################################################################


class BacklogList(generics.ListCreateAPIView):
    permission_class = [permissions.IsAuthenticated]
    queryset = Backlog.objects.prefetch_related('backlog_tasks','release')
    serializer_class = BacklogSerializer


class BacklogDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_class = [permissions.IsAuthenticated]
    queryset = Backlog.objects.prefetch_related('backlog_tasks','release')
    serializer_class = BacklogSerializer

####################################################################################
# TASK END POINT
####################################################################################


class TaskList(generics.ListCreateAPIView):
    permission_class = [permissions.IsAuthenticated]
    queryset = Task.objects.prefetch_related('backlog', 'assigned')
    serializer_class = TaskSerializer

    def perform_create(self, serializer):
        member_data = self.request.data['assigned']
        member = Member.objects.get(pk=member_data)
        backlog = Backlog.objects.get(pk=self.request.data['backlog_id'])
        
        serializer.save(assigned=member,backlog=backlog)


class TaskDetails(generics.RetrieveUpdateDestroyAPIView):
    permission_class = [permissions.IsAuthenticated]
    queryset = Task.objects.prefetch_related('backlog', 'assigned')
    serializer_class = TaskSerializer

####################################################################################
# BUG_END POINT
####################################################################################


class BugList(generics.ListCreateAPIView):
    permission_class = [permissions.IsAuthenticated]
    queryset = Bug.objects.prefetch_related(
        'assigned', 'reporter', 'release', 'bug_assigned')
    serializer_class = BugSerializer

    def perform_create(self, serializer):

        assigned = Member.objects.get(pk=self.request.data["assigned"])
        reporter = Member.objects.get(pk=self.request.data["reporter"])
        release = Release.objects.get(pk = self.request.data["release_id"])

        serializer.save(assigned = assigned , reporter = reporter,release = release)


class BugDetails(generics.RetrieveUpdateDestroyAPIView):
    permission_class = [permissions.IsAuthenticated]
    queryset = Bug.objects.prefetch_related(
        'assigned', 'reporter', 'release', 'bug_assigned')
    serializer_class = BugSerializer

####################################################################################
# TEAM END POINT
####################################################################################


class TeamList(generics.ListCreateAPIView):
    permission_class = [permissions.IsAuthenticated]
    queryset = Team.objects.prefetch_related(
        'project', 'release', 'members_team')
    serializer_class = TeamSerializer

    def perform_create(self, serializer):
        project_data = self.request.data['project_id']
        release_data = self.request.data['release_id']

        project = Project.objects.get(pk=project_data)
        release = Release.objects.get(pk=release_data)
        serializer.save(project = project,release=release)


class TeamDetails(generics.RetrieveUpdateDestroyAPIView):
    permission_class = [permissions.IsAuthenticated]
    queryset = Team.objects.prefetch_related(
        'project', 'release', 'members_team')
    serializer_class = TeamSerializer

####################################################################################
# RolePermissions END POINT
####################################################################################


class RolePermissionsList(generics.ListCreateAPIView):
    permission_class = [permissions.IsAuthenticated]
    queryset = RolePermission.objects.all()
    serializer_class = RolePermissionSerializer


class RolePermissionDetails(generics.RetrieveUpdateDestroyAPIView):
    permission_classs = [permissions.IsAuthenticated]
    queryset = RolePermission.objects.all()
    serializer_class = RolePermissionSerializer

####################################################################################
# Member END POINT
####################################################################################


class MemberList(generics.ListCreateAPIView):
    permission_class = [permissions.IsAuthenticated]
    queryset = Member.objects.prefetch_related(
        'user', 'team','member_permission','tasks_assigned')
    serializer_class = MemberSerializer

    def perform_create(self, serializer):
        user_data = self.request.data["user"]
        team_data = self.request.data["team_id"]
        
        user = User.objects.get(pk = user_data)        
        team = Team.objects.get(pk = team_data)
        
        serializer.save(user = user,team=team)
        
class MemberDetails(generics.RetrieveUpdateDestroyAPIView):
    permission_class = [permissions.IsAuthenticated]
    queryset = Member.objects.prefetch_related(
        'user', 'team','tasks_assigned',"member_permission")
    serializer_class = MemberSerializer

####################################################################################
# Messages END POINT
####################################################################################


class MessagesList(generics.ListCreateAPIView):
    permission_class = [permissions.IsAuthenticated]
    queryset = Message.objects.prefetch_related('sender')
    serializer_class = MessageSerializer
    
    def perform_create(self, serializer):
        data = self.request.data
        sender_data = data['sender']
        sender = User.objects.get(pk = sender_data)
        message = Conversation.objects.get(pk=data['conversation'])   
        serializer.save(sender = sender , conversation = message )
        
class MessageDetails(generics.RetrieveUpdateDestroyAPIView):
    permission_class = [permissions.IsAuthenticated]
    queryset = Message.objects.prefetch_related('sender')
    serializer_class = MessageSerializer


####################################################################################
# Conversation END POINT
####################################################################################
class ConversationList(generics.ListCreateAPIView):
    permission_class = [permissions.IsAuthenticated]
    queryset = Conversation.objects.prefetch_related('conversations','participant_one','participant_two')
    serializer_class = ConversationsSerializer

    def get_queryset(self):
        user = self.request.user
        return Conversation.objects.prefetch_related('conversations','participant_one','participant_two').filter(Q(participant_one = user)|Q(participant_two = user))

    def perform_create(self, serializer):
        participant_data = self.request.data['participant_two']
        participant_two = User.objects.get(pk = participant_data)
        user = self.request.user
        serializer.save(participant_one=user,participant_two = participant_two)

class ConversationDetails(generics.RetrieveUpdateDestroyAPIView):
    permission_class = [permissions.IsAuthenticated]
    queryset = Conversation.objects.prefetch_related('conversations','participant_one','participant_two')
    serializer_class = ConversationsSerializer

####################################################################################
# Messages END POINT
####################################################################################


class NotificationList(generics.ListCreateAPIView):
    permission_class = [permissions.IsAuthenticated]
    queryset = Notification.objects.prefetch_related('receiver')
    serializer_class = NotificationSerializer


    def perform_create(self, serializer):
        receiver_data = self.request.data['receiver']
        user = User.objects.get(pk = receiver_data)
        serializer.save(receiver=user)
      

    def get_queryset(self):
        return Notification.objects.filter(receiver=self.request.user)

class NotificationDetails(generics.RetrieveUpdateDestroyAPIView):
    permission_class = [permissions.IsAuthenticated]
    queryset = Notification.objects.prefetch_related('receiver')
    serializer_class = NotificationSerializer

####################################################################################
# TASK COMMENTS END POINT
####################################################################################


class TaskCommentList(generics.ListCreateAPIView):
    permission_class = [permissions.IsAuthenticated]
    queryset = TaskComment.objects.prefetch_related()
    serializer_class = TaskCommentSerializer


class TaskCommentDetails(generics.RetrieveUpdateDestroyAPIView):
    permission_class = [permissions.IsAuthenticated]
    queryset = TaskComment.objects.prefetch_related()
    serializer_class = TaskCommentSerializer


####################################################################################
# BUGs COMMENTS END POINT
####################################################################################

class BugCommentList(generics.ListCreateAPIView):
    permission_class = [permissions.IsAuthenticated]
    queryset = BugComment.objects.prefetch_related()
    serializer_class = BugCommentSerializer


class BugCommentDetails(generics.RetrieveUpdateDestroyAPIView):
    permission_class = [permissions.IsAuthenticated]
    queryset = BugComment.objects.prefetch_related()
    serializer_class = BugCommentSerializer

####################################################################################
# REQUIREMENTS LIST END POINT
####################################################################################
class RequirementsList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Requirement.objects.prefetch_related('project')
    serializer_class = RequirementsSerializer

    def perform_create(self, serializer):
        project_id = self.request.data['project_id']
        return serializer.save(project_id = project_id)

class RequirementsDetails(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Requirement.objects.prefetch_related('project')
    serializer_class = RequirementsSerializer

