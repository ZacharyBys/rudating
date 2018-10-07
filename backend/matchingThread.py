import threading, time

class MatchingThread(object):

    def __init__(self, socket, interval=1):
        self.interval = interval
        self.socket = socket
        self.thread = threading.Thread(target=self.run)
        self.thread.daemon = True

    def run(self):
        while True:
            print("background thread running.....")
            time.sleep(self.interval)

    def start(self):
        self.thread.start()