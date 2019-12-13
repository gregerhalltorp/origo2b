SOURCES = packages

.PHONY: boostrap build-all-dev build-all-only ci clean-all clean-dist lint-only run-all-dev test-only watch-all yarn-install

bootstrap: yarn-install
	yarn lerna bootstrap

build-all-dev: build-all-only
	yarn lerna run symlink

build-all-only: clean-dist
	yarn lerna run build

ci: bootstrap
	yarn lerna run --stream test
	yarn lerna run --stream lint

ci-only:
	yarn lerna run --stream test
	yarn lerna run --stream lint

clean-all:
	rm -rf node_modules
	$(foreach source, $(SOURCES), \
		$(call clean-source-node_modules, $(source)) \
		$(call clean-source-dist, $(source)))

clean-dist:
	$(foreach source, $(SOURCES), \
		$(call clean-source-dist, $(source)))

lint-only:
	yarn lerna run --stream lint

run-all-dev: build-all-dev
	yarn lerna run start --stream

test-only:
	yarn lerna run --stream test

watch-all: clean-dist
	yarn lerna run watch --parallel --ignore origo-booking --ignore origo-search & \
	yarn lerna run symlink && \
	yarn lerna run start --stream
	# yarn lerna run start-booking --stream &&
	# yarn lerna run start-search --stream &&
	# yarn lerna run start-gateway --stream &&

yarn-install: clean-all
	yarn

define clean-source-node_modules
	rm -rf $(1)/*/node_modules	
endef

define clean-source-dist
	rm -rf $(1)/*/dist
	# find ./packages -maxdepth 2 -type l | xargs rm -f
endef