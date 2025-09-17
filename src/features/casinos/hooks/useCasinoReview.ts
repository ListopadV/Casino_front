import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CreateReviewData, reviewsApi } from '../../../shared/api/reviewsApi';

interface UseCardReviewReturn {
  submitReview: (data: CreateReviewData) => Promise<void>;
  isSubmitting: boolean;
  error: string | null;
  success: boolean;
  resetForm: () => void;
}

export const useCasinoReview = (): UseCardReviewReturn => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submitReview = async (data: CreateReviewData): Promise<void> => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      await reviewsApi.createReview(data);
      setSuccess(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t('reviews.form.messages.apiError');
      setError(errorMessage);
      console.error('Ошибка при отправке отзыва:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setError(null);
    setSuccess(false);
  };

  return {
    submitReview,
    isSubmitting,
    error,
    success,
    resetForm
  };
};
