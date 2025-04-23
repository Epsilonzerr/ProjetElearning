from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Professeur, Etudiant, Admin

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ('username', 'email', 'role', 'is_staff', 'is_active')
    list_filter = ('role', 'is_staff', 'is_superuser')
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Rôle utilisateur', {'fields': ('role',)}),
    )

@admin.register(Professeur)
class ProfesseurAdmin(admin.ModelAdmin):
    list_display = ('user',)

@admin.register(Etudiant)
class EtudiantAdmin(admin.ModelAdmin):
    list_display = ('user',)

@admin.register(Admin)
class AdminAdmin(admin.ModelAdmin):
    list_display = ('user',)
