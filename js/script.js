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


// part 2

function oracle2(avg_speed, distance, time) {
  return tf.square(tf.sub(tf.div(distance, 5), tf.mul(avg_speed, tf.add(5, time))));
}

const distance_2 = tf.tensor([50.0]);
const time_2 = tf.tensor([3.5]);

function callback_2() {
  const avg_speed = document.getElementById("2-qwerty").value;
  const val_tensor = oracle(tf.tensor([Number(avg_speed)]), distance_2, time_2);
  const val = val_tensor.arraySync()[0];

  document.getElementById("2-oracle").innerHTML = val;

  if (val < 0.01) {
    document.getElementById("2-output").innerHTML = "You got it!";
  } else {
    document.getElementById("2-output").innerHTML = "";
  }
}
callback_2();


// part 3

const distance_3 = tf.tensor([1234.5]);
const time_3 = tf.tensor([9.999]);

const oracle3 = input_ => {
  return oracle2(input_, distance_3, time_3);
};
const oracle3_grad = tf.grad(oracle3);

function callback_3() {
  const avg_speed = document.getElementById("3-qwerty").value;
  const input_ = tf.tensor([Number(avg_speed)]);
  // const val_tensor = oracle3(input_);
  // const val = val_tensor.arraySync()[0];
  const grad = oracle3_grad(input_).arraySync()[0];

  document.getElementById("3-grad").innerHTML = grad;

  if (grad < 0.01 && grad > -0.01) {
    document.getElementById("3-output").innerHTML = "You got it!";
  } else {
    document.getElementById("3-output").innerHTML = "";
  }
}
callback_3();
