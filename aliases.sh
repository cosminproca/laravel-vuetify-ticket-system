# Run artisan commands
alias dc-down='docker-compose down'
alias dc-up='docker-compose up -d --build site'
alias dc='docker-compose'
alias dcr='docker-compose run --rm'
alias dc-migrate-refresh='dcr artisan migrate:refresh --seed'