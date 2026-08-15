'use client';

const PageHero = ({ subtitle, title, description, children }) => {
  return (
    <section className="section-padding bg-muted/50 text-center">
      <div className="container-narrow">
        <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-3 animate-fade-up">
          {subtitle}
        </p>
        <h1 className="font-display text-4xl md:text-6xl text-foreground mb-6 text-balance animate-fade-up" style={{ animationDelay: "0.15s" }}>
          {title}
        </h1>
        {description && (
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: "0.3s" }}>
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
};

export default PageHero;
