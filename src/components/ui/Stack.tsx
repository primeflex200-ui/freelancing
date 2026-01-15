import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState, useEffect, ReactNode } from 'react';
import { Check } from 'lucide-react';
import './Stack.css';

interface CardRotateProps {
  children: ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
  disableDrag?: boolean;
}

function CardRotate({ children, onSendToBack, sensitivity, disableDrag = false }: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(_: any, info: any) {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  if (disableDrag) {
    return (
      <motion.div className="card-rotate-disabled" style={{ x: 0, y: 0 }}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="card-rotate"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.8} // Increased elasticity for more responsive feel
      whileTap={{ cursor: 'grabbing' }}
      onDragEnd={handleDragEnd}
      // Enhanced drag responsiveness
      dragMomentum={false} // Disable momentum for more precise control
      // Smoother drag transitions
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        mass: 1
      }}
    >
      {children}
    </motion.div>
  );
}

interface StackCard {
  id: number;
  content: ReactNode;
}

interface StackProps {
  randomRotation?: boolean;
  sensitivity?: number;
  cards?: ReactNode[];
  animationConfig?: { stiffness: number; damping: number };
  sendToBackOnClick?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  mobileClickOnly?: boolean;
  mobileBreakpoint?: number;
  onCardClick?: (index: number) => void;
  showSelectionFeedback?: boolean;
  enablePreview?: boolean;
}

export default function Stack({
  randomRotation = false,
  sensitivity = 200,
  cards = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  mobileClickOnly = false,
  mobileBreakpoint = 768,
  onCardClick,
  showSelectionFeedback = false,
  enablePreview = false
}: StackProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [mobileBreakpoint]);

  const shouldDisableDrag = mobileClickOnly && isMobile;
  const shouldEnableClick = sendToBackOnClick || shouldDisableDrag;

  // Smoother animation config for mobile
  const smoothAnimationConfig = isMobile 
    ? { stiffness: 200, damping: 25 } // Smoother on mobile
    : animationConfig;

  // More sensitive on mobile - reduce sensitivity threshold
  const mobileSensitivity = isMobile ? sensitivity * 0.6 : sensitivity; // 40% more sensitive on mobile

  const [stack, setStack] = useState<StackCard[]>(() => {
    if (cards.length) {
      return cards.map((content, index) => ({ id: index + 1, content }));
    } else {
      return [
        {
          id: 1,
          content: (
            <img
              src="https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format"
              alt="card-1"
              className="card-image"
            />
          )
        },
        {
          id: 2,
          content: (
            <img
              src="https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format"
              alt="card-2"
              className="card-image"
            />
          )
        },
        {
          id: 3,
          content: (
            <img
              src="https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format"
              alt="card-3"
              className="card-image"
            />
          )
        },
        {
          id: 4,
          content: (
            <img
              src="https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format"
              alt="card-4"
              className="card-image"
            />
          )
        }
      ];
    }
  });

  useEffect(() => {
    if (cards.length) {
      setStack(cards.map((content, index) => ({ id: index + 1, content })));
    }
  }, [cards]);

  const sendToBack = (id: number) => {
    setStack(prev => {
      const newStack = [...prev];
      const index = newStack.findIndex(card => card.id === id);
      const [card] = newStack.splice(index, 1);
      newStack.unshift(card);
      return newStack;
    });
  };

  useEffect(() => {
    if (autoplay && stack.length > 1 && !isPaused) {
      const interval = setInterval(() => {
        const topCardId = stack[stack.length - 1].id;
        sendToBack(topCardId);
      }, autoplayDelay);
      return () => clearInterval(interval);
    }
  }, [autoplay, autoplayDelay, stack, isPaused]);

  const handleCardClick = (cardId: number, originalIndex: number) => {
    if (shouldEnableClick) {
      if (onCardClick) {
        if (enablePreview) {
          // Just call the callback to open preview modal
          onCardClick(originalIndex);
        } else if (showSelectionFeedback) {
          // Show selection feedback
          setSelectedIndex(originalIndex);
          // Call the callback after a short delay
          setTimeout(() => {
            onCardClick(originalIndex);
          }, 1000);
        } else {
          onCardClick(originalIndex);
        }
      } else {
        sendToBack(cardId);
      }
    }
  };

  return (
    <div
      className="stack-container"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {stack.map((card, index) => {
        const randomRotate = randomRotation ? Math.random() * 10 - 5 : 0;
        const isTopCard = index === stack.length - 1;
        const isSelected = selectedIndex === card.id - 1;
        const isHovered = hoveredIndex === card.id - 1;
        
        return (
          <CardRotate
            key={card.id}
            onSendToBack={() => sendToBack(card.id)}
            sensitivity={mobileSensitivity} // Use mobile-adjusted sensitivity
            disableDrag={shouldDisableDrag}
          >
            <motion.div
              className="card"
              onClick={() => handleCardClick(card.id, card.id - 1)}
              onMouseEnter={() => isTopCard && setHoveredIndex(card.id - 1)}
              onMouseLeave={() => setHoveredIndex(null)}
              animate={{
                rotateZ: (stack.length - index - 1) * 4 + randomRotate,
                scale: 1 + index * 0.06 - stack.length * 0.06,
                transformOrigin: '90% 90%'
              }}
              initial={false}
              transition={{
                type: 'spring',
                stiffness: smoothAnimationConfig.stiffness,
                damping: smoothAnimationConfig.damping,
                // Smoother transitions for mobile
                duration: isMobile ? 0.4 : 0.3,
                ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for smoother movement
              }}
              style={{ position: 'relative' }}
            >
              {card.content}
              
              {/* Selection Overlay */}
              {isSelected && showSelectionFeedback && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-primary/20 backdrop-blur-sm flex items-center justify-center rounded-2xl"
                  style={{ pointerEvents: 'none' }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-20 h-20 bg-primary rounded-full flex items-center justify-center"
                  >
                    <Check className="w-12 h-12 text-white" strokeWidth={3} />
                  </motion.div>
                </motion.div>
              )}
              
              {/* Hover Tooltip */}
              {isHovered && isTopCard && (showSelectionFeedback || enablePreview) && !isSelected && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-4 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap"
                  style={{ pointerEvents: 'none', zIndex: 10 }}
                >
                  {enablePreview ? 'Click to view details' : 'Click to select this design'}
                </motion.div>
              )}
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
}
