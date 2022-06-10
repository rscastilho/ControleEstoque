using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using estoque.domain.IServices;
using estoque.service.Validations;
using Microsoft.Extensions.Options;

namespace estoque.service.Services
{
    public class EmailService : IEmailService
    {
        private ConfiguracoesEmail _configuracoesEmail;

        public EmailService(IOptions<ConfiguracoesEmail> configuracoesEmail)
        {
            _configuracoesEmail = configuracoesEmail.Value;
        }

        public async Task EnviarEmail(string email, string assunto, string mensagem)
        {
            var destinatario = String.IsNullOrEmpty(email) ? _configuracoesEmail.Email : email;
            MailMessage mailMessage = new MailMessage
            {
                From = new MailAddress(_configuracoesEmail.Email, "SistemaFullStack.Net React")
            };

            mailMessage.To.Add(new MailAddress(destinatario));
            mailMessage.Subject = assunto;
            mailMessage.Body = mensagem;
            mailMessage.IsBodyHtml = true;
            mailMessage.Priority = MailPriority.High;

            using (SmtpClient smtpClient = new SmtpClient(_configuracoesEmail.Endereco, _configuracoesEmail.Porta))
            {
                smtpClient.Host="smtp.office365.com";
                smtpClient.Port=587;
                smtpClient.EnableSsl = true;
                smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtpClient.Credentials = new NetworkCredential(_configuracoesEmail.Email, _configuracoesEmail.Senha);
                smtpClient.Timeout=20000;

                await smtpClient.SendMailAsync(mailMessage);


            }


        }
    }
}