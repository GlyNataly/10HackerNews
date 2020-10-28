export const getRandomListNLength = (n, array) => array.sort(() => 0.5 - Math.random()).slice(0, n);

export const getApiRequestLoop = (url, ids) => {
  const promiseArray = [];
  for (const id of ids) {
    const request = `${url}${id}.json?print=pretty`;
    promiseArray.push(
      fetch(request)
        .then((response) => response.json())
        .then((body) => {
          if (body.error) {
            throw new Error(body.error);
          }
          return body;
        }),
    );
  }
  return Promise.all(promiseArray);
};

export const arrayToObject = (array) => {
  let object = {};
  for (const el of Object.values(array)) {
    object = {
      ...object,
      [el.id]: el,
    };
  }
  return object;
};

export const sortByStoryScore = (stories) => stories.sort((a, b) => a.score - b.score);
