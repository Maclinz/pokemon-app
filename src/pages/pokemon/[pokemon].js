import { useGlobalContext } from "@/context/global";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styles from "@/styles/Pokemon.module.css";
import Loading from "@/Components/Loading";

function Pokemon() {
  const router = useRouter();

  const { pokemon } = router.query;

  const { getPokemon, loading, pokemon: pokemonItem } = useGlobalContext();

  useEffect(() => {
    if (pokemon) {
      getPokemon(pokemon);
    }
  }, [pokemon]);

  let myLink = "";

  if (pokemonItem?.sprites?.other) {
    const { "official-artwork": link } = pokemonItem?.sprites?.other;
    myLink = link.front_default;
  }

  //pokemon bg colors
  const pkColors = [
    "#f8d5a3",
    "#f5b7b1",
    "#c39bd3",
    "#aed6f1",
    "#a3e4d7",
    "#f9e79f",
    "#fadbd8",
    "#d2b4de",
    "#a9cce3",
    "#a2d9ce",
    "#f7dc6f",
    "#f5cba7",
    "#bb8fce",
    "#85c1e9",
    "#76d7c4",
  ];

  const randomColor = pkColors[Math.floor(Math.random() * pkColors.length)];

  console.log(randomColor);

  return (
    <div
      className={styles.PokemonBg}
      style={{
        background: !loading && randomColor,
      }}
    >
      {!loading ? (
        pokemonItem && (
          <>
            <div className={styles.PokemonImage}>
              <img
                src={
                  pokemonItem?.sprites?.other?.home.front_default
                    ? pokemonItem?.sprites?.other?.home.front_default
                    : myLink
                }
                alt=""
              />
            </div>
            <div className={styles.PokemonBody}>
              <h2>{pokemonItem?.name}</h2>
              <div className={styles.PokemonInfo}>
                <div className={styles.PokemonInfoItem}>
                  <h5>Name:</h5>
                  <p>{pokemonItem?.name},</p>
                </div>

                <div className={styles.PokemonInfoItem}>
                  <h5>Type:</h5>
                  {pokemonItem?.types?.map((type) => {
                    return <p key={type.type.name}>{type.type.name},</p>;
                  })}
                </div>

                <div className={styles.PokemonInfoItem}>
                  <h5>Height:</h5>
                  <p>{pokemonItem?.height}</p>
                </div>

                <div className={styles.PokemonInfoItem}>
                  <h5>Abilities:</h5>
                  {pokemonItem?.abilities?.map((ability) => {
                    return (
                      <p key={ability.ability.name}>{ability.ability.name},</p>
                    );
                  })}
                </div>

                <div className={styles.PokemonInfoItem}>
                  <h5>Stats:</h5>
                  {pokemonItem?.stats?.map((stat) => {
                    return <p key={stat.stat.name}>{stat.stat.name},</p>;
                  })}
                </div>

                <div className={styles.PokemonInfoItem}>
                  <h5>A few moves:</h5>
                  {pokemonItem?.moves?.slice(0, 3).map((move) => {
                    return <p key={move.move.name}>{move.move.name},</p>;
                  })}
                </div>
              </div>
            </div>
          </>
        )
      ) : (
        <div className="loader">
          <Loading />
        </div>
      )}
    </div>
  );
}

export default Pokemon;
