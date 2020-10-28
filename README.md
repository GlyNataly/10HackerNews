This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Custom hooks
Custom hook useHackerNewsApi fetch ten stories at random from the
top stories list. Then return stories, isLoading and isError variables

Custom hook useApiLoopWithIds fetch 10 stories (items) in a loop and then and 10 authors (users)

### HackerNewsContainer
The main component which get 10 stories from useHackerNewsApi put them to useApiLoopWithIds for getting info about this stories, then sorted this stories. From stories I get authors ids which going to useApiLoopWithIds and getting info about authors. Then show information, error or loading depends on all three fetch result.

### For start
Make npm install
Then npm run





