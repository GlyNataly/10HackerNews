import React, { useMemo } from 'react';
import { GET_AUTHOR, GET_STORY } from '../api';
import { useHackerNewsApi } from '../hooks/useHackerNewsApi';
import { useApiLoopWithIds } from '../hooks/useApiLoopWithIds';
import { arrayToObject, sortByStoryScore } from './helpers';
import './HackerNewsContainer.scss';

const HackerNewsContainer = () => {
  const { news, isLoading, isError } = useHackerNewsApi();
  const {
    data: stories,
    isLoading: isStoriesLoading,
    isError: isStoriesError,
  } = useApiLoopWithIds(GET_STORY, news);
  const sortedStories = useMemo(() => sortByStoryScore(stories), [stories]);
  const authorsIds = useMemo(() => stories.map((item) => item.by), [stories]);
  const {
    data: authors,
    isLoading: isAuthorsLoading,
    isError: isAuthorsError,
  } = useApiLoopWithIds(GET_AUTHOR, authorsIds);
  const authorsToObject = useMemo(() => arrayToObject(authors), [authors]);

  if (isError || isStoriesError || isAuthorsError) {
    return <div>Something went wrong ...</div>;
  }

  return (
    <>
      {isLoading || isStoriesLoading || isAuthorsLoading ? (
        <div>Loading ...</div>
      ) : (
        <div>
          {sortedStories.map((item) => (
            <div key={item.id} style={{ margin: '15px' }}>
              <a href={item.url}>{item.title}</a>
              <div>
                <span className="label">{'Time: '}</span>
                {new Date(item.time).toLocaleString()}
              </div>
              <div>
                <span className="label">{'Score: '}</span>
                {item.score}
              </div>
              <div>
                <span className="label">{'Author: '}</span>
                {authorsToObject[item.by].id}
              </div>
              <div>
                <span className="label">{'Karma: '}</span>
                {authorsToObject[item.by].karma}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default HackerNewsContainer;
