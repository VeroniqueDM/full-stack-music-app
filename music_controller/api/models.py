from operator import mod
from django.db import models

# Create your models here.
 
class Room(models.Model):
    code = models.CharField()