function oracle(avg_speed, distance, time) {
  return tf.square(tf.sub(distance, tf.mul(avg_speed, time)));
}

const distance_1 = tf.tensor([20.0]);
const time_1 = tf.tensor([2.5]);

function callback_1() {
  const avg_speed = document.getElementById("1-avg-speed").value;
  const val_tensor = oracle(tf.tensor([Number(avg_speed)]), distance_1, time_1);
  const val = val_tensor.arraySync()[0];

  document.getElementById("1-oracle").innerHTML = val;

  if (val == 0) {
    document.getElementById("1-output").innerHTML = "You got it!";
  } else {
    document.getElementById("1-output").innerHTML = "";
  }
}
callback_1();
