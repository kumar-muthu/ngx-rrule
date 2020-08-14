# git pages
* ng build --project tester --prod --base-href "https://kumar-muthu.github.io/ngx-rrule/"
* npx angular-cli-ghpages --dir=dist/tester/

# local debug
* ng build --project ngx-rrule --watch
* ng serve --project tester --vendor-source-map

# publish npm
* ng build --project ngx-rrule --prod
* cd dist/ngx-rrule
* npm publish
