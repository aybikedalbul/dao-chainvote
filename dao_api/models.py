from django.db import models

class Proposal(models.Model):
    id = models.AutoField(primary_key=True)  # id automatically increases
    description = models.TextField()
    proposer = models.CharField(max_length=255) # Ethereum address
    vote_count = models.IntegerField(default=0) #vote count
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Proposal {self.id} - {self.description[:30]}..." 
