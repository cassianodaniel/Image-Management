import React, { useState } from "react";
import "./HomePage.css";
import pictureOption1 from "./../assets/images/logo512.png";
import pictureOption2 from "./../assets/images/logo514.png";
import pictureOption3 from "./../assets/images/logo516.png";
import pictureOption4 from "./../assets/images/logo513.png";
/* import { fabric } from "fabric"; */

const HomePage = () => {
  const [picture, setPicture] = useState(pictureOption1);
  const [pictures, setPictures] = useState([
    pictureOption1,
    pictureOption2,
    pictureOption3,
    pictureOption4,
  ]);
  const [firstSection, setFirstSection] = useState(true);
  const toggleSection = () => {
    setFirstSection(!firstSection);
  };
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      //Returns string | undefined
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const onAddFile = (file) => {
    var isImage = /\.(jpe?g|png|)$/i.test(file.name);
    if (isImage) {
      toBase64(file).then((res) => {
        setPictures([...pictures, res]);
      });
    } else {
      alert(
        "Invalid file type. Please, send an image as .jpg, .jpeg or .png extension"
      );
    }
  };

  const handleFileChange = (e) => {
    var files = e.target.files;
    if (files?.length === 0) return;
    let file = files?.item(0);
    if (file) {
      onAddFile(file);
    }
  };

  //Tried to inicializate a image and set it filter brightness attribute as above, but I had some trouble with.

  /* var canvas = new fabric.Canvas("c"); */

  /* var img = fabric.Image.fromURL(pictures[0], function (img) {
    var oImg = img.set({ left: 0, top: 0 }).scale(0.25);
    oImg.filters = {
      brightness: 0.5,
    };
    canvas.add(oImg);
  }); */

  /*  var filter = img.filters.Brightness({
    brightness: 0.5,
  });

  filter.filters = {
    filter,
  }; */

  const headerContent = (
    <div className="pictureContainer">
      <img src={picture} alt={"profilePicture"} className="picture" />
    </div>
  );
  const bodyContent = (
    <div className="bodyContainer">
      {firstSection ? (
        pictures.map((picture, key) => {
          return (
            <div key={key} className="columnCenter">
              <img
                src={picture}
                alt={"pictureAlt"}
                className="gridPicture"
                onClick={() => setPicture(picture)}
              />
              <label className="labelToSelect">Click to select</label>
            </div>
          );
        })
      ) : (
        <div className="columnCenter">
          <h2>Apply filter</h2>

          <input
            onChange={(e) => {
              console.log(e.target.value);
              /* applyFilterValue(0, "brightness", e.target.value); */
              // I couldn't resolve line 98 in time
            }}
            type="range"
            min="0"
            max="10"
            step="0.01"
          />

          <a href={picture} target="_blank" rel="noopener noreferrer" download>
            Save file
          </a>
        </div>
      )}
    </div>
  );
  const footerContent = (
    <div>
      {firstSection ? (
        <div className="footerContainer">
          <input
            onChange={handleFileChange}
            type="file"
            name="fileInput"
            className="footerContainerButton"
          />
          <button
            onClick={() => toggleSection()}
            className="footerContainerButton"
          >
            Continue
          </button>
        </div>
      ) : (
        <div className="footerContainer">
          <button
            onClick={() => toggleSection()}
            className="footerContainerButton"
          >
            Return
          </button>
        </div>
      )}
    </div>
  );
  return (
    <main className="content">
      <header className="headerContainer">{headerContent}</header>
      <div className="bodyContainer">{bodyContent}</div>
      <footer className="footerContainer">{footerContent}</footer>
    </main>
  );
};

export default HomePage;
