class ControllerInput:
	def __init__(self):
		self.Left = False
		self.Right = False
		self.Top = False
		self.Bottom = False

	def serializable(self):
		return {
			'Left': self.Left,
			'Right': self.Right,
			'Top': self.Top,
			'Bottom': self.Bottom,
		}
		