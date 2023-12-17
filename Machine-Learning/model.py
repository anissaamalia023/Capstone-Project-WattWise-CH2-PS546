import numpy as np
import tensorflow as tf

# Generate random data
np.random.seed(42)  # for reproducibility

# Household energy consumption in kWh
household_energy = np.random.uniform(5, 30, 1000)

# Temperature in Celsius (assuming typical tropical climate)
temperature = np.random.uniform(25, 35, 1000)

# Generate random power consumption values for each category (in kWh per day)
lighting_power = np.random.uniform(0.1, 1, 1000)
climate_control_power = np.random.uniform(1, 5, 1000)
cooking_power = np.random.uniform(2, 10, 1000)
entertainment_power = np.random.uniform(0.5, 5, 1000)
kitchen_appliances_power = np.random.uniform(1, 8, 1000)
cleaning_power = np.random.uniform(1, 5, 1000)
charging_power = np.random.uniform(0.1, 2, 1000)
miscellaneous_power = np.random.uniform(0.5, 5, 1000)

# Combine all features into a 2D array
X = np.column_stack((
    temperature,
    lighting_power,
    climate_control_power,
    cooking_power,
    entertainment_power,
    kitchen_appliances_power,
    cleaning_power,
    charging_power,
    miscellaneous_power
))

# Assign household_energy as Y
Y = household_energy

# Model with two input nodes
model = tf.keras.models.Sequential([
    tf.keras.layers.Normalization(axis=-1),
    # tf.keras.layers.Dense(512, activation='relu'),
    tf.keras.layers.Dense(256, activation='relu'),
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dense(64, activation='relu'),
    tf.keras.layers.Dense(32, activation='relu'),
    tf.keras.layers.Dense(1)
])
model.compile(loss='mean_squared_error', optimizer='adam')
model.fit(X, Y, epochs=2000, verbose=1)

# Prediction for multiple inputs
new_data = np.array([[25.0, 0.5, 2.0, 1.0, 3.0, 4.0, 2.0, 0.5, 3.0], [30.0, 1.0, 4.0, 3.0, 2.0, 6.0, 3.0, 1.5, 4.0]])
# new_data_normalized = scaler.transform(new_data)
print(model.predict(new_data))

model.save("model_1_4.h5")