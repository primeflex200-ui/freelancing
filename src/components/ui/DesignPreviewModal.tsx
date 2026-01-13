import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { DesignPrototype } from '@/data/designs';
import { Button } from './button';

interface DesignPreviewModalProps {
  design: DesignPrototype | null;
  isOpen: boolean;
  onClose: () => void;
  onSelect: () => void;
}

export function DesignPreviewModal({ design, isOpen, onClose, onSelect }: DesignPreviewModalProps) {
  if (!design) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            style={{ 
              willChange: 'opacity',
              transform: 'translateZ(0)',
              WebkitTransform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden'
            }}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              style={{ 
                willChange: 'transform, opacity',
                transform: 'translateZ(0)',
                WebkitTransform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              }}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Content */}
              <div className="overflow-y-auto max-h-[90vh]">
                {/* Image */}
                <div className="relative w-full h-[400px] md:h-[500px]">
                  <img
                    src={design.imageUrl}
                    alt={design.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Details */}
                <div className="p-8">
                  {/* Category Badge */}
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full capitalize mb-4">
                    {design.category.replace('-', ' ')}
                  </span>

                  {/* Title */}
                  <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                    {design.title}
                  </h2>

                  {/* Description */}
                  <p className="text-lg text-muted-foreground mb-6">
                    {design.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="mb-8">
                    <h3 className="text-sm font-semibold text-black mb-3">Technology Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {design.techStack.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-black/5 text-black text-sm font-medium rounded-lg"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <Button
                      onClick={onSelect}
                      className="flex-1 bg-primary text-white hover:bg-primary/90 rounded-full py-6 text-lg font-semibold"
                    >
                      <Check className="w-5 h-5 mr-2" />
                      Select This Design
                    </Button>
                    <Button
                      onClick={onClose}
                      variant="outline"
                      className="px-8 rounded-full py-6"
                    >
                      Cancel
                    </Button>
                  </div>

                  {/* Info Text */}
                  <p className="text-sm text-muted-foreground text-center mt-4">
                    Selecting this design will help us understand your style preferences
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
