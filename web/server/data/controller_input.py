class ControllerInput:
	def __init__(self):
		self.Steer = 0
		self.Drive = 0

	def serializable(self):
		return {
			'Steer': self.Steer,
			'Drive': self.Drive,
		}
		
	def __str__(self):
		return f"Steer: {self.Steer}, Drive: {self.Drive}"