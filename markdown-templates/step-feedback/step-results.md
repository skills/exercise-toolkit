{{#passed}}
## Step {{ step_number }} - Passed ✅
{{/passed}}
{{^passed}}
## Step {{ step_number }} - Fail ❌
{{/passed}}

{{#passed}}
<img src="https://octodex.github.com/images/inflatocat.png" align="right" height="200px" />
{{/passed}}
{{^passed}}
<img src="https://octodex.github.com/images/spidertocat.png" align="right" height="100px" />
Some checks failed. Please review the results below and try again.

Time to find the bug! 🤔
{{/passed}}

| Status | Name | Message |
| --- | --- | --- |
{{#results_table}}
| {{#passed}}✅ - Pass{{/passed}}{{^passed}}❌ - Fail{{/passed}} | {{ name }} | {{ message }} |
{{/results_table}}

{{#tips.length}}
### Tips

{{#tips}}
- {{.}}
{{/tips}}
{{/tips.length}}
