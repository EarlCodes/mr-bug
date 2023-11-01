from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE,related_name="user_profile")
    avatar = models.CharField(max_length=20)
    bgcolor = models.CharField(max_length=10,default="#ffffff")

#Project model
class Project(models.Model):
    #Projects instance properties
    date_created = models.DateTimeField(auto_now_add=True)
    due_date = models.DateTimeField()
    tittle = models.CharField(max_length= 50)
    description = models.CharField(max_length=250)
    progress = models.IntegerField(default= 0)
    project_owner = models.ForeignKey(User, related_name="project_owner", on_delete=models.CASCADE)

    def __str__(self):
        return self.tittle
    
    class Meta:
        ordering = ['date_created']

class Requirement(models.Model):
    requirement = models.CharField(max_length=100)
    isComplete = models.BooleanField(default=False)
    project = models.ForeignKey(Project , on_delete=models.CASCADE,related_name='project_requirements')
    
    def __str__(self) :
        return self.requirement

    class Meta:
        ordering = ['project']

#Release model
class Release(models.Model):
    #release model instance properties
    date_created = models.DateTimeField(auto_now_add=True)
    tittle = models.CharField(max_length=50)
    purpose = models.CharField(max_length=250) 
    project = models.ForeignKey(Project,related_name ='project_releases',on_delete = models.CASCADE)

    class meta:
        unique_together = ['id','project']
        ordering = ['date_created']

    def __str__(self):
        return f'{self.tittle}  {self.project.tittle}' 

#Teams model 
class Team(models.Model):
    #Model instance field
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=120)
    project = models.ForeignKey(Project,related_name='project_assigned',on_delete=models.CASCADE)
    release  = models.ForeignKey(Release,related_name='teams_working_on',on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name

    class meta:
        ordering = ["release_working_on"]

#Memebers model
class Member(models.Model):
    #Model instance field 
    team = models.ForeignKey(Team , related_name='members_team' ,on_delete= models.CASCADE)
    user = models.ForeignKey(User,related_name='team_member',on_delete=models.CASCADE)
   
    def __str__(self):
        return self.user.username
    
    class Meta:
        ordering = ['id']


#MemberPermission model
class RolePermission(models.Model):
    #option permisions
    # R = READ ,W = WRITE ,D = DELETE , U = UPDATE ,A = ASSIGN .
    PERMISSION_OPTIONS = [
        ('R','ReadOnly'),
        ('W','Write'),
        ('U','Update'),
        ('D','Delete'),

        ('RW','Read Write'),
        ('RU','Read Update'),
        ('RWD','Read Write Delete'),
        ('RUD','Read Update Delete'),
        ('RD','Read Delete'),

        ('WU','Write Update'),
        ('WUD','Write Update Delete'),
        ('WD','Write Delete'),
        
        ('UD','Update Delete'),
        
        
        ('RW','Read Write'),
        ('RWU','read write Update'),
        ('RWUD','read write update delete')]
    # member permission model instance field 
    member = models.OneToOneField(Member,related_name='member_permission', on_delete=models.CASCADE)
    project = models.CharField(max_length=4,choices=PERMISSION_OPTIONS,blank=True)
    backlog = models.CharField(max_length=4,choices=PERMISSION_OPTIONS,blank=True)
    task = models.CharField(max_length=4,choices=PERMISSION_OPTIONS,blank=True)
    bug = models.CharField(max_length=4,choices=PERMISSION_OPTIONS,blank=True)
    release = models.CharField(max_length=4,choices=PERMISSION_OPTIONS,blank=True)
    team = models.CharField(max_length=4,choices=PERMISSION_OPTIONS,blank=True)
    group_members = models.CharField(max_length=4,choices=PERMISSION_OPTIONS,blank=True)
    assign = models.CharField(max_length=4,choices=PERMISSION_OPTIONS,blank=True)

    class Meta:
        ordering =['id']

    def  __str__(self):
        return f'{self.member.user.username} Permissions'

#Backlog models
class Backlog(models.Model):
    #Option fields used to create model field choices
    
    #Status choice represents choices to be used by the status field
    STATUS_CHOICE =[
        ('NOT_STARTED','Not Started'),
        ('WORKING_ON','Working On'),
        ('DONE','Done'),
    ]

    #types of priority represents choices to be used by the priority fields
    TYPES_OF_PRIORITY = [
        ('LOW','Low'),
        ('MED','Medium'),
        ('HIGH','High')]

    #Backlog instance fields 
    date_created = models.DateTimeField(auto_now_add=True)
    release = models.ForeignKey(Release , related_name='release_backlogs' , on_delete=models.CASCADE)
    tittle = models.CharField(max_length=50)
    description = models.CharField(max_length=250)
    acceptence_criteria = models.CharField(max_length=250)
    story_points = models.IntegerField(default= 0)
    color = models.CharField(max_length=10)
    priority = models.CharField(max_length=10,choices=TYPES_OF_PRIORITY , default='Low')
    progress = models.IntegerField()
    status = models.CharField(max_length=20 ,choices=STATUS_CHOICE , default='Not Started')
    

    class meta:
        ordering =['id']

    def __str__(self):
        return self.tittle

# Tasks models
class Task(models.Model):
    #Option fields used to create model field choices
    
    #Associated with the progress field
    PROGRESS_CHOICES = [
        ('TODO', 'Todo'),
        ('IN_PROGRESS', 'In Progress'),
        ('DONE', 'Done')
    ]
    
    #Associated with the status field
    STATUS_CHOICES = [
        ('PAUSE','Pause'),
        ('PLAY','Play')        
    ]

    #Tasks item fields
    date_created = models.DateTimeField(auto_now_add=True)
    tittle = models.CharField(max_length=50)
    description = models.CharField(max_length=250)
    estimations = models.DurationField()
    time_worked = models.DurationField(null=True,blank=True)
    time_start = models.DateField(null=True,blank=True)
    time_completed = models.DateField(null=True,blank=True)
    time_assigned = models.DateField(null=True,blank=True)
    progress = models.CharField(max_length=20,choices=PROGRESS_CHOICES , default ='TODO')
    status = models.CharField(max_length=10,choices= STATUS_CHOICES ,default= 'PAUSE')
    task_play = models.DateTimeField(null=True,blank=True)
    backlog = models.ForeignKey(Backlog , related_name='backlog_tasks',on_delete=models.CASCADE)
    assigned = models.ForeignKey(Member, related_name='tasks_assigned',on_delete=models.CASCADE)
    
    class meta:
        ordering = ['']

    def __str__(self):
        return self.tittle
    
#Bug model
class Bug(models.Model):
    #Options for fields associated with choices input 
    #Associated with the severity field   
    SEVERITY_OF_BUG = [
        ('STABLE' , 'Stable'),
        ('MODERATE' , 'Moderate'),
        ('CRITICAL', 'Critical'),
        ('SEVERE', 'Severe')
    ]
    #associated with status field
    STATUS_CHOICES = [
        ('PENDING_RESOLVE','Pending Resolve'),
        ('RESOLVING','Resolving'),
        ('RESOLVED','Resolved')
    ]

    TIME_STATUS = [
        ('PAUSE','Pause'),
        ('PLAY','Play')
    ]

    #Bug model instance fields
    date_created = models.DateTimeField(auto_now_add=True)
    tittle = models.CharField(max_length=50)
    description = models.CharField(max_length=250)
    reproduce = models.CharField(max_length=250)
    severity = models.CharField(max_length=20,choices=SEVERITY_OF_BUG , default='STABLE')
    status = models.CharField(max_length=20,choices=STATUS_CHOICES ,default='PENDING_RESOLVE')
    assigned = models.ForeignKey(Member, related_name='bug_assigned',on_delete=models.CASCADE)
    reporter = models.ForeignKey(Member, related_name='reporter',on_delete=models.CASCADE)
    time_worked = models.DurationField()
    time_status = models.CharField(max_length=10,choices=TIME_STATUS,default ='PAUSE')
    release = models.ForeignKey(Release ,related_name='release_bugs',on_delete=models.CASCADE)

    class meta:
        ordering = ['severity']

    def __str__(self):
        return self.tittle

class Conversation(models.Model):
    date_created = models.DateTimeField(auto_now_add=True)
    participant_one = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name="participant_one", on_delete=models.CASCADE)
    participant_two = models.ForeignKey(settings.AUTH_USER_MODEL,related_name='participant_two',on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.participant_one} and {self.participant_two}'

    class Meta:
        ordering = ['date_created']


#Messages model
class Message(models.Model):
    note = models.CharField(max_length=150)
    date_created = models.DateTimeField(auto_now_add=True)
    isRead = models.BooleanField(default= False)
    sender = models.ForeignKey(User,related_name='sender',on_delete=models.CASCADE)
    conversation = models.ForeignKey(Conversation,on_delete=models.CASCADE,related_name='conversations')

    def __str__(self):
        return f'{self.conversation.participant_one} and {self.conversation.participant_two}'
    
    class Meta:
        ordering =['date_created']


#Notifications model
class Notification(models.Model):
    #Model instance fields
    date_created = models.DateTimeField(auto_now_add=True)
    description = models.CharField(max_length=250)
    isRead = models.BooleanField(default= 'False')
    receiver = models.ForeignKey(User , related_name='notifications' , on_delete= models.CASCADE)
    
    def __str__(self):
        return 'Notification'
    
    class Meta:
        ordering =['date_created']

#Task comments model
class TaskComment(models.Model):
    #comments instance field 
    date_created = models.DateTimeField(auto_now_add=True)
    description = models.CharField(max_length=150) 
    commentor = models.ForeignKey(Member, related_name='taskCommentor',on_delete=models.CASCADE)
    task = models.ForeignKey(Task,related_name='taskComments',on_delete=models.CASCADE)

    def __str__(self):
        return 'task comments'

    class meta:
        ordering = ['date_created']

#Bug comments model
class BugComment(models.Model):
    #comments instance field 
    date_created = models.DateTimeField(auto_now_add=True)
    description = models.CharField(max_length=150) 
    commentor = models.ForeignKey(Member, related_name='bugCommentor',on_delete=models.CASCADE)
    task = models.ForeignKey(Bug,related_name='bugComments',on_delete=models.CASCADE)

    def __str__(self):
        return 'Bug Comments'

    class meta:
        ordering = ['date_created']


# Create your models here.
