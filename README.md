# Monkeu-UI

## Openshift 

### Create Project
```bash
oc new-project dev \
         --description="Development Stage" \
         --display-name="Development"
```


### Deploy App Docker Image
```bash
oc new-app --docker-image=c3smonkey/monkey-ui:latest \
     --name='monkey-ui' \
    -l name='monkey-ui' \
    -e SELECTOR=monkey-ui
```

### Expose 
```bash
oc expose svc/monkey-ui --name=monkey-ui --port=8080
```

Now suppose you want to update to next version of the service, to version 1.1, 
so you need to run next commands to deploy next version of crimes service container, which is pushed at Docker Hub.

#### Update Image
```bash
oc import-image monkey-ui:oshi --from=c3smonkey/monkey-ui:oshi
```

Then let's prepare the application so when next rollout command is applied, the new image is deployed:
```bash
oc patch dc/monkey-ui -p '{"spec": { "triggers":[ {"type": "ConfigChange", "type": "ImageChange" , "imageChangeParams": {"automatic": true, "containerNames":["monkey-ui"],"from": {"name":"monkey-ui:oshi"}}}]}}'
```

And finally you can do the rollout of the application by using:

```bash
oc rollout latest dc/monkey-ui 
```

#### Rolback
```bash
oc rollback monkey-ui-1
```


 