from django.urls import path ,include
from . import views
from knox import views as knox_views
from rest_framework.urlpatterns import format_suffix_patterns

app_name ='mrbug'

urlpatterns = format_suffix_patterns([
    #Login and log out 
     path(r'login/',views.LoginView.as_view(), name='knox_login'),
     path(r'logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
     path(r'logoutall/', knox_views.LogoutAllView.as_view(), name='knox_logoutall'),
    #Users path
    path(r'users/create-account/',view=views.UserCreate.as_view()),
    path(r'users/account/', view=views.UserDetails.as_view(),name='user-detail'),
    path(r"users/",view=views.UserList.as_view(),name='user-list'),
    
    #projects path 
    path('projects/',view = views.ProjectList.as_view()),
    path('project/<int:pk>/',view= views.ProjectDetails.as_view(),name='project-detail'),

    #Requirements path
    path('requirements/',view=views.RequirementsList.as_view()),
    path('requirements/<int:pk>',view=views.RequirementsDetails.as_view(),name ='requirement-detail'),
    
    #release paths
    path('release/',view=views.ReleaseList.as_view()),
    path('release/<int:pk>/',view=views.ReleaseDetails.as_view(),name ='release-detail'),

    #Backlog paths
    path('backlog/',view = views.BacklogList.as_view()),
    path('backlog/<int:pk>/',view = views.BacklogDetail.as_view(),name='backlog-detail'),

    path('bug/',view=views.BugList.as_view()),
    path('bug/<int:pk>/',views.BugDetails.as_view(),name= 'bug-detail'),

    #Team backlog path
    path('team/',views.TeamList.as_view()),
    path('team/<int:pk>/',views.TeamDetails.as_view(),name='team-detail'),

    #Role Permmissions path
    path('rolePermissions/',views.RolePermissionsList.as_view()),
    path('rolePermission/<int:pk>/',views.RolePermissionDetails.as_view(),name='rolepermission-detail'),

    #Member paths
    path('member/',views.MemberList.as_view()),
    path('member/<int:pk>/', view= views.MemberDetails.as_view(),name='member-detail'),

    #Task paths
    path('task/',views.TaskList.as_view()),
    path('taskDetails/<int:pk>/',views.TaskDetails.as_view(),name='task-detail'),

    #Message path 
    path('messages/',view=views.MessagesList.as_view()),
    path('messages/<int:pk>/',view=views.MessageDetails.as_view(),name='message-detail'),

    #Conversation path
    path('conversations/',view= views.ConversationList.as_view()),
    path('conversations/<int:pk>/',view=views.ConversationDetails.as_view(),name='conversation-detail'),
    
    #Notification
    path('notifications/',view=views.NotificationList.as_view()),
    path('notifications/<int:pk>',view=views.NotificationDetails.as_view(),name ='notification-detail'),

    
    #
    path('taskComment/',view=views.TaskCommentList.as_view()),
    path('taskComment/<int:pk>/',view=views.TaskCommentDetails.as_view(),name='taskcomment-detail'),
    
    #
    path('bugComment/',view=views.BugCommentList.as_view()),
    path('bugComment/<int:pk>/',view=views.BugCommentDetails.as_view(),name='bugcomment-detail'),

])