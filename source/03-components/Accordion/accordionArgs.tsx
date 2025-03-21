import { AccordionProps } from '@/source/03-components/Accordion/Accordion';

const accordionArgs = {
  allowMultiple: true,
  allowToggle: true,
  isStepList: false,
  accordionItems: [
    {
      id: '',
      title: 'First Accordion Heading',
      isOpen: true,
      content: (
        <>
          <p>
            A paragraph (from the Greek paragraphos, “to write beside” or
            “written beside”) is a self-contained unit of a discourse in writing
            dealing with a particular point or idea. A paragraph consists of one
            or more sentences. Though not required by the syntax of any
            language, paragraphs are usually an expected part of formal writing,
            used to organize longer prose.
          </p>
          <p>
            This is what a successive paragraph looks like. Some people prefer a
            space between paragraphs, while others prefer successive paragraphs
            indented with no margins between them.
          </p>
        </>
      ),
    },
    {
      id: '',
      title: 'Second Accordion Heading',
      isOpen: false,
      content: (
        <>
          <p>
            This accordion item has a lot more content so you see what it would
            look like.
          </p>
          <p>
            This is WYSIWYG content, which can contain{' '}
            <abbr title="Hyper Text Markup Language">HTML</abbr> markup. There
            is no limit to how long this content can be. It could have both{' '}
            <a href="#0">internal</a> and{' '}
            <a href="https://example.com">external</a> links.
          </p>
          <p>
            A paragraph (from the Greek paragraphos, “to write beside” or
            “written beside”) is a self-contained unit of a discourse in writing
            dealing with a particular point or idea. A paragraph consists of one
            or more sentences. Though not required by the syntax of any
            language, paragraphs are usually an expected part of formal writing,
            used to organize longer prose.
          </p>
          <p>
            This is what a successive paragraph looks like. Some people prefer a
            space between paragraphs, while others prefer successive paragraphs
            indented with no margins between them.
          </p>
          <ul>
            <li>This is a list item in an unordered list</li>
            <li>
              An unordered list is a list in which the sequence of items is not
              important. Sometimes, an unordered list is a bulleted list. And
              this is a long list item in an unordered list that can wrap onto a
              new line.
            </li>
            <li>
              Lists can be nested inside of each other
              <ul>
                <li>This is a nested list item</li>
                <li>This is another nested list item in an unordered list</li>
              </ul>
            </li>
            <li>This is the last list item</li>
          </ul>
          <p>
            A paragraph (from the Greek paragraphos, “to write beside” or
            “written beside”) is a self-contained unit of a discourse in writing
            dealing with a particular point or idea. A paragraph consists of one
            or more sentences. Though not required by the syntax of any
            language, paragraphs are usually an expected part of formal writing,
            used to organize longer prose.
          </p>
          <blockquote>
            <p>
              A block quotation (also known as a long quotation or extract) is a
              quotation in a written document, that is set off from the main
              text as a paragraph, or block of text, and typically distinguished
              visually using indentation and a different typeface or smaller
              size quotation.
            </p>
            <cite>Jane Doe, President and CEO</cite>
          </blockquote>
          <p>
            A paragraph (from the Greek paragraphos, “to write beside” or
            “written beside”) is a self-contained unit of a discourse in writing
            dealing with a particular point or idea. A paragraph consists of one
            or more sentences. Though not required by the syntax of any
            language, paragraphs are usually an expected part of formal writing,
            used to organize longer prose.
          </p>
        </>
      ),
    },
    {
      id: '',
      title: 'Third Accordion Heading',
      isOpen: false,
      content: (
        <>
          <p>
            A paragraph (from the Greek paragraphos, “to write beside” or
            “written beside”) is a self-contained unit of a discourse in writing
            dealing with a particular point or idea. A paragraph consists of one
            or more sentences. Though not required by the syntax of any
            language, paragraphs are usually an expected part of formal writing,
            used to organize longer prose.
          </p>
          <p>
            This is what a successive paragraph looks like. Some people prefer a
            space between paragraphs, while others prefer successive paragraphs
            indented with no margins between them.
          </p>
        </>
      ),
    },
    {
      id: '',
      title: 'Fourth Accordion Heading',
      isOpen: false,
      content: (
        <>
          <p>
            A paragraph (from the Greek paragraphos, “to write beside” or
            “written beside”) is a self-contained unit of a discourse in writing
            dealing with a particular point or idea. A paragraph consists of one
            or more sentences. Though not required by the syntax of any
            language, paragraphs are usually an expected part of formal writing,
            used to organize longer prose.
          </p>
          <p>
            This is what a successive paragraph looks like. Some people prefer a
            space between paragraphs, while others prefer successive paragraphs
            indented with no margins between them.
          </p>
        </>
      ),
    },
  ],
} satisfies AccordionProps;

export default accordionArgs;
