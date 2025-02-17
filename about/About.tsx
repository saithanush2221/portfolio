import { motion } from 'framer-motion';

export default function About() {
  return (
    <section className="py-20 px-4 md:px-8 bg-accent/5" id="about">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h2 className="text-4xl font-bold mb-6">About Me</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Results-driven professional with experience in Machine Learning, Web Development, Data
              Analysis, and Business Intelligence. Proficient in SQL and NoSQL databases, with expertise
              in designing and developing dynamic web applications. Skilled in Figma and modern web
              design tools for UI/UX development.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-card rounded-lg">
                <h3 className="font-bold text-xl mb-2">Technical Skills</h3>
                <p className="text-muted-foreground">Python, SQL/NoSQL, Machine Learning, Web Development</p>
              </div>
              <div className="p-4 bg-card rounded-lg">
                <h3 className="font-bold text-xl mb-2">Specialties</h3>
                <p className="text-muted-foreground">Data Analysis, Prompt Engineering, UI/UX Design</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-6 bg-card rounded-lg">
              <h3 className="font-bold text-xl mb-4">Education</h3>
              <div className="space-y-2">
                <p className="text-muted-foreground">
                  <span className="font-semibold">Narayana Junior College</span><br />
                  Pre-University Course - 8.0 GPA
                </p>
                <p className="text-muted-foreground">
                  <span className="font-semibold">Oxford English Medium School</span><br />
                  Secondary Education - 10 GPA
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
