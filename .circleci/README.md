# git pages
* npx angular-cli-ghpages --dir=dist/tester/
* ng build --project tester --prod --base-href "https://kumar-muthu.github.io/ngx-rrule/"

# local debug
* ng build --project ngx-rrule --watch
* ng serve --project tester --vendor-source-map

# publish npm
* cd dist/ngx-rrule
* npm publish
