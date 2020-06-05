
SOURCES = service packages

.PHONY: bootstrap clean-all

bootstrap:
	yarn
	npx lerna bootstrap --use-workspaces -- --production=false

clean-all:
	rm -rf node_modules
	rm -rf package-lock.json
	rm -f yarn.lock

	$(foreach source, $(SOURCES), \
		$(call clean-source-all, $(source)))


define clean-source-all
	rm -rf $(1)/*/node_modules
	rm -rf $(1)/*/package-lock.json
endef
