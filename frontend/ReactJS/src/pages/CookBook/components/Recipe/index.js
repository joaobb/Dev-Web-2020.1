import React from 'react';
import { useParams } from 'react-router-dom';

import Loader from '../../../../assets/Loader';

import useFetch from '../../../../services/swr';
import { getFlag } from '../../../../utils/nationalities';
import CookingMethod from '../CookingMethod';

import {
  Container,
  Image,
  Title,
  Small,
  Origin,
  RecipeBasics,
  Header,
} from './styles';

const Recipe = () => {
  const { id } = useParams();

  const { data } = useFetch(id ? `/recipes/${id}` : '');

  return (
    <Container>
      {data ? (
        <>
          <CookingMethod
            method={data.cooking_method}
            ingredients={data.ingredients}
          />
          <RecipeBasics>
            <Image src={data.image} />
            <Header>
              <div>
                <Title>{data.name}</Title>
                <Origin origin={getFlag(data.cuisine[0])} />
              </div>
              <div>
                <Small>{data.prep_time} Min</Small>
                <Small>{data.serves} Serves</Small>
              </div>
            </Header>
            <hr />
          </RecipeBasics>
        </>
      ) : (
        <Loader />
      )}
    </Container>
  );
};

export default Recipe;
