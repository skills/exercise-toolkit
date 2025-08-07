{% set socials_text -%}
{%- if exercise_title -%}
I just completed the "{{ exercise_title }}" GitHub Skills hands-on exercise! 🎉
{%- else -%}
I just completed a GitHub Skills hands-on exercise! 🎉
{%- endif %}

{{ repository_url }}

#GitHubSkills #OpenSource #GitHubLearn
{%- endset -%}

<div align="center">

# 🎉 Congratulations {{ login }}! 🎉

<img src="https://octodex.github.com/images/welcometocat.png" height="200px" />

### 🌟 You've successfully completed the exercise! 🌟

## 🚀 Share Your Success!

**Show off your new skills and inspire others!**

<a href="https://twitter.com/intent/tweet?text={{ socials_text | urlencode }}" target="_blank" rel="noopener noreferrer">
  <img src="https://img.shields.io/badge/Share%20on%20X-1da1f2?style=for-the-badge&logo=x&logoColor=white" alt="Share on X" />
</a>
<a href="https://bsky.app/intent/compose?text={{ socials_text | urlencode }}" target="_blank" rel="noopener noreferrer">
  <img src="https://img.shields.io/badge/Share%20on%20Bluesky-0085ff?style=for-the-badge&logo=bluesky&logoColor=white" alt="Share on Bluesky" />
</a>
<a href="https://www.linkedin.com/feed/?shareActive=true&text={{ socials_text | urlencode }}" target="_blank" rel="noopener noreferrer">
  <img src="https://img.shields.io/badge/Share%20on%20LinkedIn-0077b5?style=for-the-badge&logo=linkedin&logoColor=white" alt="Share on LinkedIn" />
</a>

### 🎯 What's Next?

**Keep the momentum going!**

[![](https://img.shields.io/badge/Return%20to%20Exercise-%E2%86%92-1f883d?style=for-the-badge&logo=github&labelColor=197935)]({{ issue_url }})
[![GitHub Skills](https://img.shields.io/badge/Explore%20GitHub%20Skills-000000?style=for-the-badge&logo=github&logoColor=white)](https://learn.github.com/skills)

*There's no better way to learn than building things!* 🚀

</div>

---

&copy; 2025 GitHub &bull; [Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/code_of_conduct.md) &bull; [MIT License](https://gh.io/mit)
