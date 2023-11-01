from django.contrib import admin
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from . import models

# Register your models here.m
class Profile(admin.StackedInline):
    model = models.Profile
    can_delete = False
    verbose_name_plural = "profile"

class UserAdmin(BaseUserAdmin):
    inlines = [Profile]

app_models = [models.Profile,models.Backlog,models.Bug,models.BugComment,models.Member,models.Notification,models.Project,models.Release,models.RolePermission,models.Task ,models.TaskComment,models.Team,models.Message,models.Conversation,models.Requirement]

admin.site.unregister(User)
admin.site.register(User,UserAdmin)

admin.site.register(app_models)

