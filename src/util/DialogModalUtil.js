import { getStoryDetailsById } from "../redux/actions/user";

async function fetchData(userId, storyId) {
  return await getStoryDetailsById(userId, storyId);
}

export function processAlbumData(album) {
  let i = 0;
  let gallery = [];
  // eslint-disable-next-line array-callback-return
  Object.entries(album).map(([key, value]) => {
    if (key.includes("videos")) {
      Object.entries(value).forEach((element) => {
        let keyName = "video" + i++;
        gallery.push({
          key: keyName,
          value: element[1],
        });
      });
    } else if (key.includes("userContent")) {
      Object.entries(value).forEach((element) => {
        const userId = element[0];
        const storyId = element[1];
        fetchData(userId, storyId)
          .then((data) => {
            if (data.videoornot) {
              let keyName = "video" + i++;
              gallery.push({
                key: keyName,
                value: data.imageDownloadURL,
              });
            } else {
              let keyName = "image" + i++;
              gallery.push({
                key: keyName,
                value: data.imageDownloadURL,
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
    } else {
      let keyName = "image" + i++;
      gallery.push({
        key: keyName,
        value: value,
      });
    }
  });
  return gallery;
}
