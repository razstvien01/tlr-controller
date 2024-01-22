class ControllerInput:
	def __init__(self, assignedUser):
		self.Steer = 0
		self.Drive = 0
		self.AssignedUser = assignedUser

	def serializable(self):
		return {
			'Steer': self.Steer,
			'Drive': self.Drive,
		}
		