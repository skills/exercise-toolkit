{{#passed}}

## Step {{ step_number }} - Passed ✅

{{/passed}}
{{^passed}}

## Step {{ step_number }} - Fail ❌

{{/passed}}

<div style="display: flex; align-items: flex-start;">
<div style="flex: 1; min-width: 0;">

| Status | Description |
| ------ | ----------- |

{{#results_table}}
| {{#passed}}✅ - Pass{{/passed}}{{^passed}}❌ - Fail{{/passed}} | {{ description }} |
{{/results_table}}

{{#tips.length}}

### Tips

{{#tips}}

- {{.}}
  {{/tips}}
  {{/tips.length}}

</div>
<div style="margin-left: 20px; flex-shrink: 0;">
{{#passed}}
<img src="https://octodex.github.com/images/inflatocat.png" height="200px" alt="Inflatocat image indicating the step passed" />
{{/passed}}
{{^passed}}
<img src="https://octodex.github.com/images/spidertocat.png" height="100px" alt="Spidertocat image indicating the step failed" />
Some checks failed. Please review the results below and try again.

Time to find the bug! 🤔
{{/passed}}

</div>
</div>
