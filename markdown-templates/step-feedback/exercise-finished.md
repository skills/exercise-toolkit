<img src="https://octodex.github.com/images/welcometocat.png" align="left" height="150px" />

Congratulations @{{ login }}! You finished the exercise! 🎉🎉🎉
{% if readme_updated == "true" %}
We've updated the repository with a couple changes to highlight your success!

Return to the [repository home](/{{ repo_full_name }}) page to see your progress!
{%- else %}
You've successfully completed all the steps. Well done!
{%- endif %}
