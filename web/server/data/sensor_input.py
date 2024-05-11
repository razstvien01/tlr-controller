class SensorInput:
	def __init__(self):
		self.Message = ''

	def serializable(self):
		return {
			'Message': self.Message
		}
		