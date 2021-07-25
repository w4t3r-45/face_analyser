const canvas = document.getElementById("main_canvas");
let ctx = canvas.getContext("2d");

async function main() {
  // Load the model.
  const model = await blazeface.load();

  // Pass in an image or video to the model. The model returns an array of
  // bounding boxes, probabilities, and landmarks, one for each detected face.

  const returnTensors = false; // Pass in `true` to get tensors back, rather than values.
  const predictions = await model.estimateFaces(document.querySelector("img"), returnTensors);

  if (predictions.length > 0) {
    /*
    `predictions` is an array of objects describing each detected face, for example:

    [
      {
        topLeft: [232.28, 145.26],
        bottomRight: [449.75, 308.36],
        probability: [0.998],
        landmarks: [
          [295.13, 177.64], // right eye
          [382.32, 175.56], // left eye
          [341.18, 205.03], // nose
          [345.12, 250.61], // mouth
          [252.76, 211.37], // right ear
          [431.20, 204.93] // left ear
        ]
      }
    ]
    */

    for (let i = 0; i < predictions.length; i++) {
      const start = predictions[i].topLeft;
      const end = predictions[i].bottomRight;
      const size = [end[0] - start[0], end[1] - start[1]];

      // Render a rectangle over each detected face.
      ctx.drawImage(document.querySelector("img"),0,0,514,514);
      ctx.strokeStyle = "red";
      ctx.lineWidth = "4";
      ctx.rect(start[0], start[1], size[0], size[1]);
      ctx.stroke();
    }

       // fill landmarks
       ctx.fillStyle = "yellow";
       predictions[0].landmarks.forEach((landmark) => {
        ctx.fillRect(landmark[0],landmark[1],5,5);
      });

    console.log(predictions);
    
  }
}

main();