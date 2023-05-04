import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context/context";
import { Pie3d, Column3d, Bar3d, Doughnut2d } from "./Charts";
const Repos = () => {
  const { repos } = useGlobalContext();

  let usedData = repos.reduce((allLanguage, repo) => {
    const { language, stargazers_count: stars } = repo;
    if (!language) return allLanguage;
    const curObj = allLanguage[language] ?? {
      label: language,
      value: 0,
      stars: 0,
    };
    return {
      ...allLanguage,
      [language]: {
        ...curObj,
        value: curObj.value + 1,
        stars: curObj.stars + stars,
      },
    };
  }, {});

  // console.log(
  //   Object.values(languages).sort((a, b) => {
  //     return a.value - b.value;
  //   })
  // );

  usedData = Object.values(usedData).sort((a, b) => {
    return b.value - a.value;
  });

  const pieData = usedData.map((item) => {
    return { labe: item.label, value: item.value };
  });

  const doughnutData = usedData
    .sort((a, b) => {
      return b.stars - a.stars;
    })
    .map((item) => {
      return { label: item.label, value: item.stars };
    });
  // const doughnutData = Object.values(languages).sort((a, b) => {
  //   return b.stars - a.stars;
  // });

  // stars folks

  let { stars, forks } = repos.reduce(
    (allItem, cur) => {
      const { stargazers_count, name, forks_count } = cur;
      allItem.stars[stargazers_count] = {
        label: name,
        value: stargazers_count,
      };
      allItem.forks[forks_count] = {
        label: name,
        value: forks_count,
      };
      return allItem;
    },
    { stars: {}, forks: {} }
  );

  stars = Object.values(stars).slice(-5).reverse();
  forks = Object.values(forks).slice(-5).reverse();

  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie3d data={pieData} />
        <Column3d data={stars} />
        <Doughnut2d data={doughnutData} />
        <Bar3d data={forks} />
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
    height: 400px !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
