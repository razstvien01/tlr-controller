from controller_input import ControllerInput
from sensor_input import SensorInput

class RobotData:
	def __init__(self):
		self.Control = ControllerInput()
		self.Sensor = SensorInput()