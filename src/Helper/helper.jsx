export const fetch = () => {};

export const getImage = async () => {
  try {
    const res = await fetch(`https://picsum.photos/800`);
    const data = await res.json();

    console.log(res);

    if (!res.ok)
      throw new Error(
        "There was a problem on fetching the image"
      );

    console.log(data);
  } catch (err) {
    console.log(err.message);
  }
};

export const randomInt = (min, max) =>
  Math.trunc(Math.random() * (max - min + 1) + min);

export const isEmptyObject = (obj) =>
  JSON.stringify(obj) === "{}";
