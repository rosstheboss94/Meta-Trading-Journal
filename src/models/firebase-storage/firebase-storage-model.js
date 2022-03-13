import { storage } from "../../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export class FirebaseStorage {
  uploadImg = (user, journalName, chartImg) => {
    const storageRef = ref(
      storage,
      `images/${user}/${journalName}/${chartImg.name}`
    );

    const metaData = {
      contentType: "image/jpeg",
    };

    try {
      const uploadTask = uploadBytesResumable(storageRef, chartImg, metaData);

      let uploaded = false;

      uploadTask.on("state_changed", null, null, () => {
        uploaded = true;
        console.log("finished");
      });
    } catch (err) {
      console.log(err);
    }
  };

  setImgUrl = async (user, journalName, chartImg) => {
    const imageRef = ref(
      storage,
      `images/${user}/${journalName}/${chartImg.name}`
    );

    const downloadUrl = await getDownloadURL(imageRef);
    return downloadUrl;
  };

  getTradeImg = async (imgUrl) => {
    getDownloadURL();
  };
}
