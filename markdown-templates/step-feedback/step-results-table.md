{{#passed}}

## Step {{ step_number }} - Passed ✅

{{/passed}}
{{^passed}}

## Step {{ step_number }} - Fail ❌

{{/passed}}

{{#passed}}
<img src="https://octodex.github.com/images/inflatocat.png" align="right" height="150px" alt="Inflatocat image indicating the step passed" />
{{/passed}}
{{^passed}}
<img src="https://octodex.github.com/images/spidertocat.png" align="right" height="100px" alt="Spidertocat image indicating the step failed" />
Some checks failed. Please review the results below and try again.

Time to find the bug! 🤔
{{/passed}}

| Status | Description |
| --- | --- |
{{#results_table}}
| {{#passed}}✅ - Pass{{/passed}}{{^passed}}❌ - Fail{{/passed}} | {{ description }} |
{{/results_table}}

{{#tips.length}}

### Tips

{{#tips}}

- {{.}}
  {{/tips}}
  {{/tips.length}}
