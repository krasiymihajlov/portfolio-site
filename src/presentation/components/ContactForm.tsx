'use client';

import React, { useState, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import styles from './ContactForm.module.css';

interface FormData {
  from_name: string;
  email: string;
  phone?: string;
  message: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    from_name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [status, setStatus] = useState<FormStatus>({
    type: 'idle',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: '' });

    try {
      // TODO: Replace these with your actual EmailJS credentials
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

      // Check if credentials are configured
      if (serviceId === 'YOUR_SERVICE_ID' || templateId === 'YOUR_TEMPLATE_ID' || publicKey === 'YOUR_PUBLIC_KEY') {
        setStatus({
          type: 'error',
          message: 'EmailJS не е конфигуриран. Моля, следвайте инструкциите в EMAILJS_SETUP.md',
        });
        return;
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.from_name,
          email: formData.email,
          phone: formData.phone || 'Не е предоставен',
          message: formData.message,
          to_name: 'Красимир Михайлов',
        },
        publicKey
      );

      setStatus({
        type: 'success',
        message: 'Съобщението е изпратено успешно! Ще се свържа с вас скоро.',
      });

      // Reset form
      setFormData({
        from_name: '',
        email: '',
        phone: '',
        message: '',
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setStatus({ type: 'idle', message: '' });
      }, 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus({
        type: 'error',
        message: 'Възникна грешка при изпращане на съобщението. Моля, опитайте отново или ме контактувайте директно на krasiymihailov@gmail.com',
      });
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="from_name" className={styles.label}>
            Име <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="from_name"
            name="from_name"
            value={formData.from_name}
            onChange={handleChange}
            required
            className={styles.input}
            placeholder="Вашето име"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email <span className={styles.required}>*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.input}
            placeholder="vashemail@example.com"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone" className={styles.label}>
            Телефон <span className={styles.optional}>(по избор)</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={styles.input}
            placeholder="+359 888 123 456"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="message" className={styles.label}>
            Съобщение <span className={styles.required}>*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className={styles.textarea}
            placeholder="Разкажете ми за вашия проект или въпрос..."
          />
        </div>

        <button
          type="submit"
          disabled={status.type === 'loading'}
          className={`${styles.submitButton} ${
            status.type === 'loading' ? styles.loading : ''
          }`}
        >
          {status.type === 'loading' ? 'Изпращане...' : 'Изпрати съобщение'}
        </button>

        {status.message && (
          <div
            className={`${styles.statusMessage} ${
              status.type === 'success' ? styles.success : styles.error
            }`}
          >
            {status.message}
          </div>
        )}
      </form>
    </div>
  );
}
