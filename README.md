# Docker Setup for Laravel

## Setup

To get started, make sure you have [Docker installed](https://docs.docker.com/docker-for-mac/install/) on your system, and then clone this repository.

Next, navigate in your terminal to the directory you cloned this, and spin up the containers for the web server by running `docker-compose up -d --build site`.

After that completes, follow the steps from the [src/README.md](src/README.md) file to get your Laravel project added in (or create a new blank one).

Bringing up the Docker Compose network with `site` instead of just using `up`, ensures that only our site's containers are brought up at the start, instead of all of the command containers as well. The following are built for our web server, with their exposed ports detailed:

- **nginx** - `:8080`
- **mysql** - `:4000`
- **cypress** - `:4001`
- **php** - `:9000`

If you want to bring down the network use `docker-compose down` (removes the build triggering a rebuild when running `docker-compose up` again and doesn't persist DB operations) or `docker-compose stop`(only stops the container from running leaving the DB intact).

Three additional containers are included that handle Composer, NPM, and Artisan commands *without* having to have these platforms installed on your local computer. Use the following command examples from your project root, modifying them to fit your particular use case.

- `docker-compose run --rm composer update`
- `docker-compose run --rm npm run dev`
- `docker-compose run --rm artisan migrate` 

Keep in mind that you cannot run `php artisan migrate` locally, it has to be either from the docker CLI or `docker-compose run --rm artisan migrate` .

Also due to caching and other mechanisms, if you install everything with `docker-compose run` things won't work correctly when run locally but if you install everything locally with `npm`, `composer` and `php artisan` things will work perfectly fine except for migrations.

## Persistent MySQL Storage

By default, whenever you bring down the Docker network, your MySQL  data will be removed after the containers are destroyed. If you would  like to have persistent data that remains after bringing containers down and back up, do the following:

1. Create a `mysql` folder in the project root, alongside the `nginx` and `src` folders.
2. Under the `mysql` service in your `docker-compose.yml` file, add the following lines:

```
volumes:
  - ./mysql:/var/lib/mysql
```

3. Repeat the steps from above and replace `mysql` with `cypress`.