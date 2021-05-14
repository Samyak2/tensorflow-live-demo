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
    // answer is 8
    document.getElementById("1-output").innerHTML = "You got it! 🎉";
  } else {
    document.getElementById("1-output").innerHTML = "";
  }
}
callback_1();

// part 2

function oracle2(avg_speed, distance, time) {
  return tf.square(
    tf.sub(tf.div(distance, 5), tf.mul(avg_speed, tf.add(5, time)))
  );
}

const distance_2 = tf.tensor([50.0]);
const time_2 = tf.tensor([3.5]);

function callback_2() {
  const avg_speed = document.getElementById("2-qwerty").value;
  const val_tensor = oracle(tf.tensor([Number(avg_speed)]), distance_2, time_2);
  const val = val_tensor.arraySync()[0];

  document.getElementById("2-oracle").innerHTML = val;

  if (val < 0.01) {
    // answer is 14.3
    document.getElementById("2-output").innerHTML = "You got it! 🎉";
  } else {
    document.getElementById("2-output").innerHTML = "";
  }
}
callback_2();

// part 3

const distance_3 = tf.tensor([1234.5]);
const time_3 = tf.tensor([9.999]);

const oracle3 = (input_) => {
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
    // answer is 16.4611
    document.getElementById("3-output").innerHTML = "You got it! 🎉";
  } else {
    document.getElementById("3-output").innerHTML = "";
  }
}
callback_3();

// part 4 and 5
const cream = tf.tensor([10.0]);

function ic_oracle(milk, sugar, cream) {
  const term = tf.add(
    tf.mul(tf.tensor([0.5]), tf.pow(milk, 2)),
    tf.mul(tf.tensor([0.3]), tf.pow(sugar, 2)),
    tf.mul(tf.tensor([0.0]), cream)
  );
  return tf.square(tf.sub(tf.tensor([100.0]), term));
}

function callback_4() {
  const milk_r = Number(document.getElementById("4-milk").value);
  const sugar_r = Number(document.getElementById("4-sugar").value);

  const milk = tf.tensor([milk_r]);
  const sugar = tf.tensor([sugar_r]);

  const err = ic_oracle(milk, sugar, cream).arraySync()[0];

  document.getElementById("4-oracle").innerHTML = err;

  if (err < 0.01) {
    // answer is 14.01, 2.5
    // or 12.3, 9
    document.getElementById("4-output").innerHTML =
      "You got it! Here's your ice-cream 🍦";
  } else {
    document.getElementById("4-output").innerHTML = "";
  }
}
callback_4();

// part 5 specific
const ic_grad = tf.grads((milk, sugar) => {
  return ic_oracle(milk, sugar, cream);
});

function callback_5() {
  const milk_r = Number(document.getElementById("5-milk").value);
  const sugar_r = Number(document.getElementById("5-sugar").value);

  const milk = tf.tensor([milk_r]);
  const sugar = tf.tensor([sugar_r]);

  const err = ic_oracle(milk, sugar, cream).arraySync()[0];
  const grads = ic_grad([milk, sugar]);
  const milk_err = grads[0].arraySync()[0];
  const sugar_err = grads[1].arraySync()[0];

  document.getElementById("5-oracle").innerHTML = err;
  document.getElementById("5-milk-gradient").value = milk_err;
  document.getElementById("5-sugar-gradient").value = sugar_err;

  if (err < 0.01) {
    document.getElementById("5-output").innerHTML =
      "You got it! Here's your ice-cream 🍦";
  } else {
    document.getElementById("5-output").innerHTML = "";
  }
}
callback_5();
