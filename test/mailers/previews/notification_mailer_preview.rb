# Preview all emails at http://localhost:3000/rails/mailers/notification_mailer
class NotificationMailerPreview < ActionMailer::Preview


  def notify
    NotificationMailer.notify("All is good")
  end

end
