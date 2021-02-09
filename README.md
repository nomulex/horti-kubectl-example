# CHT Sample Horti update 

1. Create cluster
` k3d cluster create horti-test`

2. Set Context

`kubectl config use-context k3d-horti-test`

3. create namespace
`kubectl create namespace cht`

4. Create service account 
`kubectl -n cht create serviceaccount cht-horticulturalist`

5. Get the token name 
`kubectl -n cht get serviceaccount/cht-horticulturalist  -o yaml`

6. Get token content
`kubectl -n cht get secrets cht-horticulturalist-token-nsmsm -o yaml`

7. Get kubeconfig structure
`kubectl config view -o yaml`

8. Create you kubeconfig similar to `horti-kubeconfig.yml` N.B you url ports will  definately be different. 
