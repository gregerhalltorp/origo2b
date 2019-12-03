SOURCES = packages

.PHONY: boostrap build-all-only build-all-dev clean-all clean-dist run-all-dev watch-all yarn-install

build-all-only: clean-dist
	yarn lerna run build

build-all-dev: build-all-only
	yarn lerna run symlink

watch-all: clean-dist
	yarn lerna run watch --parallel --ignore origo-booking --ignore origo-search & \
	yarn lerna run symlink && \
	yarn lerna run start --stream
	# yarn lerna run start-booking --stream &&
	# yarn lerna run start-search --stream &&
	# yarn lerna run start-gateway --stream &&

run-all-dev: build-all-dev
	yarn lerna run start --stream

clean-all:
	rm -rf node_modules
	$(foreach source, $(SOURCES), \
		$(call clean-source-node_modules, $(source)) \
		$(call clean-source-dist, $(source)))

clean-dist:
	$(foreach source, $(SOURCES), \
		$(call clean-source-dist, $(source)))

yarn-install: clean-all
	yarn

bootstrap: yarn-install
	yarn lerna bootstrap

define clean-source-node_modules
	rm -rf $(1)/*/node_modules	
endef

define clean-source-dist
	rm -rf $(1)/*/dist
	# find ./packages -maxdepth 2 -type l | xargs rm -f
endef