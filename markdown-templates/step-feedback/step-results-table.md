{% if passed %}

## Step {{ step_number }} - Passed ✅

{% else %}

## Step {{ step_number }} - Fail ❌

{% endif %}

{% if passed %}
<img src="https://octodex.github.com/images/inflatocat.png" align="right" height="150px" alt="Inflatocat image indicating the step passed" />
{% else %}
<img src="https://octodex.github.com/images/spidertocat.png" align="right" height="100px" alt="Spidertocat image indicating the step failed" />
Some checks failed. Please review the results below and try again.

Time to find the bug! 🤔
{% endif %}

| Status | Description |
| ------ | ----------- |

{% for row in results_table %}
| {% if row.passed %}✅ - Pass{% else %}❌ - Fail{% endif %} | {{ row.description }} |
{% endfor %}

{% if tips and tips.length %}

### Tips

{% for tip in tips %}

- {{ tip }}
{% endfor %}
{% endif %}
