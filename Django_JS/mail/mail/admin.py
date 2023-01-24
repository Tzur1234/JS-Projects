from django.contrib import admin

# Register your models here.
from .models import Email, User



# class EmailAdmin(admin.ModelAdmin):
#     filter_horizontal = ('archived','read', 'timestamp', 'subject', 'recipients', 'sender')



admin.site.register(Email)
admin.site.register(User)
